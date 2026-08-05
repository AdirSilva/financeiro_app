package financeiro_app.dto;

import financeiro_app.model.TipoCategoria;

public record CategoriaDTO(
    Long id,
    String nome,
    TipoCategoria tipo
) {}