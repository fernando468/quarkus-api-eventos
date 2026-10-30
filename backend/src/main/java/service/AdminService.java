package service;

import domain.exception.EntidadeJaExisteException;
import domain.model.Admin;
import domain.repository.AdminRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class AdminService {
    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Transactional
    public void criar(Admin admin) {
        if (findByEmail(admin.getEmail().getEmail()) != null) {
            throw new EntidadeJaExisteException("Admin já existe com o email: " + admin.getEmail().getEmail());
        }

        adminRepository.persist(admin);
    }

    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
}
