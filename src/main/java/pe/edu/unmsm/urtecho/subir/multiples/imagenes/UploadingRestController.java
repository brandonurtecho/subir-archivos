package pe.edu.unmsm.urtecho.subir.multiples.imagenes;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

//import reactor.core.publisher.Flux;

@RestController
public class UploadingRestController {
	
//    public static final String uploadingDir = System.getProperty("user.dir") + "/uploadingDir/";
    private static final Logger log = LoggerFactory.getLogger(UploadingRestController.class);
    public static final String uploadingDir = "C:/Temp/";

    @PostMapping(value = "/")
    public String uploadingPost(@RequestParam("arhivosBackend[]") List<MultipartFile> uploadingFiles) throws IOException {
    	    	    	
        for(MultipartFile uploadedFile : uploadingFiles) {
            File file = new File(uploadingDir + uploadedFile.getOriginalFilename());    
            log.info(file.getName());
            uploadedFile.transferTo(file);
        }
                
        return "subido";
    }

}