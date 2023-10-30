package com.tfg.app.service;

import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmailService {
 
    @Autowired
    JavaMailSender javaMailSender;

    // @Autowired
    // PdfService pdfService;

    @Value("${spring.mail.username}")
    private String email;

    public void sendListEmail(String emailTo, String pass){
        MimeMessage message = javaMailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            // File file = pdfService.generatePlacesPdf();
            helper.setFrom(email, "SmileLink");
            helper.setTo(emailTo);
            helper.setSubject("Credenciales SmileLink");
            helper.setText("Estas son sus credenciales: \n\nUsuario: "+emailTo+ "\nContraseña: "+pass);
            javaMailSender.send(message);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    public void sendRecoveryEmail(String emailTo, String pass){
        MimeMessage message = javaMailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            // File file = pdfService.generatePlacesPdf();
            helper.setFrom(email, "SmileLink");
            helper.setTo(emailTo);
            helper.setSubject("¿Ha olvidado su contraseña?");
            helper.setText("Estas son sus credenciales: \n\nUsuario: "+emailTo+ "\nContraseña: "+pass);
            javaMailSender.send(message);
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}
