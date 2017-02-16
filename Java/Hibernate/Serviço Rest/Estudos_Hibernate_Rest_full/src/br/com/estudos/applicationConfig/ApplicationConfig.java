package br.com.estudos.applicationConfig;

import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/cliente")
public class ApplicationConfig extends ResourceConfig{

	public ApplicationConfig(){
		packages("br.com.estudos.config");
	}
}
