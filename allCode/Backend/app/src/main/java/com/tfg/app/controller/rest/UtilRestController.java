package com.tfg.app.controller.rest;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lowagie.text.DocumentException;
import com.tfg.app.model.User;
import com.tfg.app.service.UserService;
import com.tfg.app.util.ExporterPDF;

@RestController
@RequestMapping("/api/util")
public class UtilRestController {

    @Autowired
    private UserService userService;

    
    @GetMapping("/exportPDF")
    public void exportPatientListPDF(HttpServletResponse repsonse) throws DocumentException, IOException{
        repsonse.setContentType("application/pdf");

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Pacientes_" + currentDateTime + ".pdf";

        repsonse.setHeader(header, value);

        List<User> patients = userService.findAll();

        ExporterPDF exporter = new ExporterPDF(patients);
        exporter.export(repsonse);

        
    }
}
