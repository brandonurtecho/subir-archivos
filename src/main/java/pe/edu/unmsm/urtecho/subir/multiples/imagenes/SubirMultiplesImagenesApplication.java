package pe.edu.unmsm.urtecho.subir.multiples.imagenes;

import java.io.File;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SubirMultiplesImagenesApplication {

	public static void main(String[] args) {
		new File(UploadingController.uploadingDir).mkdirs();
		SpringApplication.run(SubirMultiplesImagenesApplication.class, args);
	}

}
