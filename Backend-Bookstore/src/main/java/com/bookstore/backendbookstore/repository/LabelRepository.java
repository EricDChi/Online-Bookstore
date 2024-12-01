package com.bookstore.backendbookstore.repository;

import com.bookstore.backendbookstore.entity.Label;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

import static org.neo4j.cypherdsl.core.StatementCatalog.Clause.MATCH;

public interface LabelRepository extends Neo4jRepository<Label, Long> {

    Label findByName(String name);

    @Query(value = "MATCH (label:Label) - [:SUB_LABEL]->(subLabel) - [:SUB_LABEL]->(subLabels) WHERE label.name=$0 RETURN subLabels")
    List<Label> findSubLabelsofSublabels(String name);
}
