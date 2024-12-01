package com.bookstore.backendbookstore.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;

import java.util.HashSet;
import java.util.Set;

@Node
@Getter
@Setter
public class Label {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    public Label() {
    }

    public Label(String name) {
        this.name = name;
    }

    @Relationship(type = "SUB_LABEL")
    public Set<Label> subLabels;

    public void addSubLabel(Label label) {
        if (subLabels == null) {
            new HashSet<>();
        }
        subLabels.add(label);
    }
}
