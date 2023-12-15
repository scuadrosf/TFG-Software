package com.tfg.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;
import com.tfg.app.model.Util;
import com.tfg.app.repository.UtilRepository;

@Service
public class UtilService {

    @Autowired
    private UtilRepository utilRepository;

    public void save(Util util) {
        this.utilRepository.save(util);
    }

    public Optional<Util> findById(Long id) {
        return utilRepository.findById(id);
    }

    public void delete(Util entity) {
        utilRepository.delete(entity);
    }

    public int getAppointmentsCompletedYesterday() {
        return utilRepository.getAppointmentsCompletedYesterday();
    }

    public int getNumPatientsYesterday() {
        return utilRepository.getNumPatientsYesterday();
    }

    public int getNumPatientsTotal() {
        return utilRepository.getNumPatientsTotal();
    }

    // public void updateUtilData(Util utilData) {
    //     Util util = utilRepository.findById(2L).orElse(new Util(0, 0, 0)); // Suponiendo que el ID es 1

    //     if (util.getId() == null) {
    //         // Si no existe una fila en la tabla, crea una nueva instancia
    //         util = new Util();
    //     }
    //     if (utilData.getAppointmentsCompletedYesterday() != 0)
    //         util.setAppointmentsCompletedYesterday(utilData.getAppointmentsCompletedYesterday());
    //     if(utilData.getNumPatientsYesterday() != 0)
    //         util.setNumPatientsYesterday(utilData.getNumPatientsYesterday());
    //     if (utilData.getNumPatientsTotal() != 0)
    //         util.setNumPatientsTotal(utilData.getNumPatientsTotal());

    //     utilRepository.save(util);
    // }

    public Util partialUpdate(Long id, Util partialUtil) throws NotFoundException {
        Optional<Util> optionalUtil = utilRepository.findById(id);

        if (optionalUtil.isPresent()) {
            Util existingUtil = optionalUtil.get();

            // Actualiza solo los campos no nulos proporcionados
            if (partialUtil.getAppointmentsCompletedYesterday() != 0) {
                existingUtil.setAppointmentsCompletedYesterday(partialUtil.getAppointmentsCompletedYesterday());
            }
            if (partialUtil.getNumPatientsYesterday() != 0){
                existingUtil.setNumPatientsYesterday(partialUtil.getNumPatientsYesterday());
            }
            if (partialUtil.getNumPatientsTotal() != 0) {
                existingUtil.setNumPatientsTotal(partialUtil.getNumPatientsTotal());
            }

            // Guarda la entidad actualizada
            return utilRepository.save(existingUtil);
        } else {
            // Manejo de error si el Util no existe
            throw new NotFoundException();
        }
    }
}