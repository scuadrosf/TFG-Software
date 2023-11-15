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
import com.tfg.app.model.User;

public class ExporterPDF {

    private List<User> patientList;

    public ExporterPDF(List<User> patientList) {
        super();
        this.patientList = patientList;
    }

    private void headerTable(PdfPTable table) {
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

    private void writeData(PdfPTable table) {
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

    public void export(HttpServletResponse response) throws DocumentException, IOException {
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

        headerTable(table);
        writeData(table);

        document.add(table);
        document.close();
    }
}
