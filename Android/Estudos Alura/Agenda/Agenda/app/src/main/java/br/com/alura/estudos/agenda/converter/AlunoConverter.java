package br.com.alura.estudos.agenda.converter;

import org.json.JSONStringer;

import java.util.List;

import br.com.alura.estudos.agenda.modelo.Aluno;

/**
 * Created by Michael on 25/04/2017.
 */
public class AlunoConverter {


    public String converterParaJSON(List<Aluno> alunos) {
        JSONStringer js = new JSONStringer();

        try {
            js.object().key("list").array().object().key("aluno").array();

            for(Aluno aluno : alunos){
                js.object();
                js.key("id").value(aluno.getId());
                js.key("nota").value(aluno.getNota());
                js.endObject();
            }

            js.endArray().endObject().endArray().endObject();

        }catch(Exception e){
            e.printStackTrace();
        }

        return js.toString();
    }
}
