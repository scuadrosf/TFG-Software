package com.tfg.app.util;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.tfg.app.model.User;

public class ExporterExcel {

    private XSSFWorkbook book;
    private XSSFSheet sheet;

    private List<User> patientList;

    public ExporterExcel(List<User> patientList) {
        this.patientList = patientList;
        book = new XSSFWorkbook();
        sheet = book.createSheet("Pacientes");
    }

    private void headerPatientsTable() {
        Row row = sheet.createRow(0);
        CellStyle style = book.createCellStyle();
        XSSFFont font = book.createFont();
        font.setBold(true);
        font.setFontHeight(14);
        style.setFont(font);

        Cell cell = row.createCell(0);
        cell.setCellValue("Nombre");
        cell.setCellStyle(style);

        cell = row.createCell(1);
        cell.setCellValue("Apellidos");
        cell.setCellStyle(style);

        cell = row.createCell(2);
        cell.setCellValue("DNI");
        cell.setCellStyle(style);

        cell = row.createCell(3);
        cell.setCellValue("Teléfono");
        cell.setCellStyle(style);

        cell = row.createCell(4);
        cell.setCellValue("Correo electrónico");
        cell.setCellStyle(style);

        cell = row.createCell(5);
        cell.setCellValue("Fecha de nacimiento");
        cell.setCellStyle(style);

        cell = row.createCell(6);
        cell.setCellValue("Género");
        cell.setCellStyle(style);

        cell = row.createCell(7);
        cell.setCellValue("Dirección");
        cell.setCellStyle(style);
    }

    private void writePatientsData() {
        int nRow = 1;

        CellStyle style = book.createCellStyle();
        XSSFFont font = book.createFont();
        font.setFontHeight(12);
        style.setFont(font);

        for (User user : patientList) {
            Row row = sheet.createRow(nRow++);

            Cell cell = row.createCell(0);
            cell.setCellValue(user.getName());
            sheet.autoSizeColumn(0);
            cell.setCellStyle(style);

            cell = row.createCell(1);
            cell.setCellValue(user.getLastName());
            sheet.autoSizeColumn(1);
            cell.setCellStyle(style);

            cell = row.createCell(2);
            cell.setCellValue(user.getUsername());
            sheet.autoSizeColumn(2);
            cell.setCellStyle(style);

            cell = row.createCell(3);
            cell.setCellValue(user.getPhone());
            sheet.autoSizeColumn(3);
            cell.setCellStyle(style);

            cell = row.createCell(4);
            cell.setCellValue(user.getEmail());
            sheet.autoSizeColumn(4);
            cell.setCellStyle(style);

            cell = row.createCell(5);
            cell.setCellValue(user.getBirth().toString());
            sheet.autoSizeColumn(5);
            cell.setCellStyle(style);

            cell = row.createCell(6);
            cell.setCellValue(user.getGender());
            sheet.autoSizeColumn(6);
            cell.setCellStyle(style);

            cell = row.createCell(7);
            cell.setCellValue(user.getAddress()+", "+user.getCity()+", "+ user.getPostalCode()+", "+user.getCountry());
            sheet.autoSizeColumn(6);
            cell.setCellStyle(style);
        }
    }

    public void exportPatients(HttpServletResponse response) throws IOException{
        headerPatientsTable();
        writePatientsData();
        
        ServletOutputStream outputStream = response.getOutputStream();
        book.write(outputStream);

        book.close();
        outputStream.close();
    }
}
