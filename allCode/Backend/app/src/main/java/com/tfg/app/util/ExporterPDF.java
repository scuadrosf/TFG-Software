package com.tfg.app.util;

import java.awt.Color;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.tfg.app.model.Appointment;
import com.tfg.app.model.User;

public class ExporterPDF {

    private List<User> patientList;
    private List<Appointment> appointmentList;

    // public ExporterPDF(List<User> patientList) {
    //     super();
    //     this.patientList = patientList;
    // }

    public ExporterPDF() {
    }

    

    public void setPatientList(List<User> patientList) {
        this.patientList = patientList;
    }

    public void setAppointmentList(List<Appointment> appointmentList) {
        this.appointmentList = appointmentList;
    }



    private void headerPatientsTable(PdfPTable table) {
        PdfPCell cell = new PdfPCell();

        cell.setBackgroundColor(Color.blue);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Nombre", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Apellidos", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("DNI", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Teléfono", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Correo electrónico", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Fecha de nacimiento", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Género", font));
        table.addCell(cell);
    }

    private void writePatientsData(PdfPTable table) {
        for (User user : patientList) {
            table.addCell(user.getName());
            table.addCell(user.getLastName());
            table.addCell(user.getUsername());
            table.addCell(user.getPhone());
            table.addCell(user.getEmail());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            table.addCell(user.getBirth().format(formatter).toString());
            table.addCell(user.getGender());
        }
    }

    public void exportPatients(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(Color.BLACK);
        font.setSize(14);

        Paragraph title = new Paragraph("Lista de pacientes", font);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        PdfPTable table = new PdfPTable(7);
        table.setWidthPercentage(100);
        table.setSpacingBefore(15);
        table.setWidths(new float[] { 2f, 2f, 2.1f, 2f, 4.5f, 2f, 2f });
        table.setWidthPercentage(110);

        headerPatientsTable(table);
        writePatientsData(table);

        document.add(table);
        document.close();
    }


    private void headerAppointmentsTable(PdfPTable table) {
        PdfPCell cell = new PdfPCell();

        cell.setBackgroundColor(Color.blue);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Nombre", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Apellidos", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("DNI", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Fecha de nacimiento", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Motivo", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Hora de inicio", font));
        table.addCell(cell);
        
        cell.setPhrase(new Phrase("Hora de fin", font));
        table.addCell(cell);

        cell.setPhrase(new Phrase("Teléfono", font));
        table.addCell(cell);
    }

    private void writeAppointmentsData(PdfPTable table) {
        for (Appointment appointment : appointmentList) {
            table.addCell(appointment.getUser().getName());
            table.addCell(appointment.getUser().getLastName());
            table.addCell(appointment.getUser().getUsername());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            table.addCell(appointment.getUser().getBirth().format(formatter).toString());
            table.addCell(appointment.getDescription());
            DateTimeFormatter formatterH = DateTimeFormatter.ofPattern("HH:mm");
            table.addCell(appointment.getFromDate().format(formatterH).toString());
            table.addCell(appointment.getToDate().format(formatterH).toString());
            table.addCell(appointment.getUser().getPhone());
        }
    }

    public void exportAppointments(HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(Color.BLACK);
        font.setSize(14);

        Paragraph title = new Paragraph("Citas pendientes", font);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        PdfPTable table = new PdfPTable(8);
        table.setWidthPercentage(90);
        table.setSpacingBefore(25);
        table.setWidths(new float[] { 2f, 2f, 2.1f, 2f, 4.5f, 2f, 2f, 2f});
        table.setWidthPercentage(100);

        headerAppointmentsTable(table);
        writeAppointmentsData(table);

        document.add(table);
        document.close();
    }
    
}
