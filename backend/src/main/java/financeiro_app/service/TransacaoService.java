package financeiro_app.service;

import financeiro_app.dto.*;
import financeiro_app.model.Categoria;
import financeiro_app.model.Transacao;
import financeiro_app.repository.CategoriaRepository;
import financeiro_app.repository.TransacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;
    private final CategoriaRepository categoriaRepository;

    public TransacaoService(TransacaoRepository transacaoRepository, CategoriaRepository categoriaRepository) {
        this.transacaoRepository = transacaoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<TransacaoResponseDTO> listarTodas() {
        return transacaoRepository.findAll()
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    public TransacaoResponseDTO salvar(TransacaoRequestDTO dto) {
        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada id: " + dto.categoriaId()));

        Transacao transacao = new Transacao();
        transacao.setDescricao(dto.descricao());
        transacao.setValor(dto.valor());
        transacao.setData(dto.data());
        transacao.setCategoria(categoria);

        return converterParaResponse(transacaoRepository.save(transacao));
    }

    public TransacaoResponseDTO atualizar(Long id, TransacaoRequestDTO dto) {
        Transacao transacao = transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada id: " + id));

        Categoria categoria = categoriaRepository.findById(dto.categoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada id: " + dto.categoriaId()));

        transacao.setDescricao(dto.descricao());
        transacao.setValor(dto.valor());
        transacao.setData(dto.data());
        transacao.setCategoria(categoria);

        return converterParaResponse(transacaoRepository.save(transacao));
    }

    public void deletar(Long id) {
        if (!transacaoRepository.existsById(id)) {
            throw new RuntimeException("Transação não encontrada id: " + id);
        }
        transacaoRepository.deleteById(id);
    }

    private TransacaoResponseDTO converterParaResponse(Transacao t) {
        CategoriaDTO catDTO = new CategoriaDTO(t.getCategoria().getId(), t.getCategoria().getNome(), t.getCategoria().getTipo());
        return new TransacaoResponseDTO(t.getId(), t.getDescricao(), t.getValor(), t.getData(), catDTO);
    }
}