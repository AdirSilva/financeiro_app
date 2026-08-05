package financeiro_app.service;

import financeiro_app.dto.CategoriaDTO;
import financeiro_app.model.Categoria;
import financeiro_app.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<CategoriaDTO> listarTodas() {
        return repository.findAll()
                .stream()
                .map(c -> new CategoriaDTO(c.getId(), c.getNome(), c.getTipo()))
                .toList();
    }

    public CategoriaDTO salvar(CategoriaDTO dto) {
        Categoria categoria = new Categoria(null, dto.nome(), dto.tipo());
        Categoria salva = repository.save(categoria);
        return new CategoriaDTO(salva.getId(), salva.getNome(), salva.getTipo());
    }
}