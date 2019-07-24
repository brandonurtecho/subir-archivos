package pe.edu.unmsm.urtecho.subir.multiples.imagenes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UploadingController {
	
    public static final String uploadingDir = System.getProperty("user.dir") + "/uploadingDir/";

    @GetMapping("/")
    public String subir() {
        return "index";
    }

}