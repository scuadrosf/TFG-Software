package com.tfg.app.controller.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.app.service.EmailService;

@RestController
@RequestMapping("/api/email")
public class EmailRestController {
    
    private final EmailService emailService;

    public EmailRestController(EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public void sendEmail(@RequestParam String emailTo, @RequestParam String pass){
        // String user = emailTo;
        this.emailService.sendListEmail(emailTo, pass);
    }

    @PostMapping("/recovery")
    public void sendEmailRecovery(@RequestParam String emailTo, @RequestParam String pass){
        // String user = emailTo;
        this.emailService.sendRecoveryEmail(emailTo, pass);
    }

}
