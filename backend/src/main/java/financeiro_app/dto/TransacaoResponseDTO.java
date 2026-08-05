package financeiro_app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransacaoResponseDTO(
    Long id,
    String descricao,
    BigDecimal valor,
    LocalDate data,
    CategoriaDTO categoria
) {}