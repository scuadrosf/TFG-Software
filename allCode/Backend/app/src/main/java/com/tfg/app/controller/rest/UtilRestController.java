package com.tfg.app.controller.rest;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lowagie.text.DocumentException;
import com.tfg.app.model.Appointment;
import com.tfg.app.model.Intervention;
import com.tfg.app.model.User;
import com.tfg.app.service.AppointmentService;
import com.tfg.app.service.InterventionService;
import com.tfg.app.service.UserService;
import com.tfg.app.util.ExporterExcel;
import com.tfg.app.util.ExporterPDF;

@RestController
@RequestMapping("/api/util")
public class UtilRestController {

    @Autowired
    private UserService userService;
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private InterventionService interventionService;

    
    @GetMapping("/exportPatientsPDF")
    public void exportPatientListPDF(HttpServletResponse response) throws DocumentException, IOException{
        response.setContentType("application/pdf");

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Pacientes_" + currentDateTime + ".pdf";

        response.setHeader(header, value);

        List<User> patients = userService.findAll();

        ExporterPDF exporter = new ExporterPDF();
        exporter.setPatientList(patients);
        exporter.exportPatients(response);

        
    }

    @GetMapping("/exportAppointmentsPDF")
    public void exportAppointmentListPDF(HttpServletResponse repsonse) throws DocumentException, IOException{
        repsonse.setContentType("application/pdf");

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Citas_" + currentDateTime + ".pdf";

        repsonse.setHeader(header, value);

        List<Appointment> appointments = appointmentService.findAll();

        ExporterPDF exporter = new ExporterPDF();
        exporter.setAppointmentList(appointments);
        exporter.exportAppointments(repsonse);

        
    }

    @GetMapping("/exportInterventionsPDF/{id}")
    public void exportInterventionsPDF(HttpServletResponse repsonse, @PathVariable Long id) throws DocumentException, IOException{
        repsonse.setContentType("application/pdf");

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Intervenciones_" + currentDateTime + ".pdf";

        repsonse.setHeader(header, value);

        List<Intervention> interventions = interventionService.findByUserId(id);

        ExporterPDF exporter = new ExporterPDF();
        exporter.setInterventionList(interventions);
        exporter.exportIntervention(repsonse);

        
    }

    /////////////////////////////////////////////////////////////

    @GetMapping("/exportPatientsExcel")
    public void exportPatientListExcel(HttpServletResponse response) throws DocumentException, IOException{
        response.setContentType("application/octet-stream");

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());

        String header = "Content-Disposition";
        String value = "attachment; filename=Pacientes_" + currentDateTime + ".xlsx";

        response.setHeader(header, value);

        List<User> patients = userService.findAll();

        ExporterExcel exporter = new ExporterExcel(patients);

        exporter.exportPatients(response);
        // exporter.setPatientList(patients);
        // exporter.exportPatients(repsonse);

        
    }
}
