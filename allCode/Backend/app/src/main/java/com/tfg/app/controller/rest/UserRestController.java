package com.tfg.app.controller.rest;

import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;

import java.net.URI;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.app.controller.DTOS.UserDTO;
import com.tfg.app.model.User;
import com.tfg.app.repository.UserRepository;
import com.tfg.app.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    User currentUser;

    @ModelAttribute
	public void addAttributes(Model model, HttpServletRequest request) {
		Principal principal = request.getUserPrincipal();

		if (principal != null) {
			userService.findByEmail(principal.getName()).ifPresent(us -> currentUser = us);
			model.addAttribute("curretUser", currentUser);

		} else {
			model.addAttribute("logged", false);
		}
	}

    @GetMapping("/me")
    public ResponseEntity<User> me(HttpServletRequest request) {

		Principal principal = request.getUserPrincipal();

		if (principal != null) {
			return ResponseEntity.ok(userService.findByEmail(principal.getName()).orElseThrow());
		} else {
			return ResponseEntity.notFound().build();
		}
	}


    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> register (@RequestBody UserDTO userDTO){
        User user = new User(userDTO);

        if(!userService.existUsername(user.getUsername())){
            user.setPasswordEncoded(passwordEncoder.encode(user.getPasswordEncoded()));
            user.setRoles(Arrays.asList("USER"));

            userService.save(user);
            URI location = fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();

            return ResponseEntity.created(location).body(user);
        }else{
            return new ResponseEntity<User>(HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/userList")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> userList = userService.findAll();
        return ResponseEntity.ok(userList);
    }
}
