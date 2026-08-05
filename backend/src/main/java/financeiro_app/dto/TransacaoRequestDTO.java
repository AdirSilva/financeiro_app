package financeiro_app.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransacaoRequestDTO(
    String descricao,
    BigDecimal valor,
    LocalDate data,
    Long categoriaId
) {}