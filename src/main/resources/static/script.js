$(document).ready(function() {
		
	var arch = [];
		
	$('#drag-and-drop-zone').dmUploader({ //
//	    url: '/demo/java-script/upload',
	    maxFileSize: 1000000000, // 3 Megs 
	    queue: true,
	    auto: false,
	    allowedTypes: '*', //'image/*'
	    extFilter: ["jpg", "jpeg","png","gif","mp4"], //["jpg", "jpeg","png","gif"],
	    onDragEnter: function(){
	      // Happens when dragging something over the DnD area
	      this.addClass('active');
	    },
	    onDragLeave: function(){
	      // Happens when dragging something OUT of the DnD area
	      this.removeClass('active');
	    },
	    onInit: function(){
	      // Plugin is ready to use
	      ui_add_log('Penguin initialized :)', 'info');
	    },
	    onComplete: function(){
	      // All files in the queue are processed (success or error)
	      ui_add_log('All pending tranfers finished');
	    },
	    onNewFile: function(id, file){
	      // When a new file is added using the file selector or the DnD area
	      ui_add_log('New file added #' + id);
	      arch.push(file);
	      console.log(file)
	      ui_multi_add_file(id, file);

	      if (typeof FileReader !== "undefined"){
	        var reader = new FileReader();
	        var img = $('#uploaderFile' + id).find('img');
	        
	        reader.onload = function (e) {
	          img.attr('src', e.target.result);
	        }
	        reader.readAsDataURL(file);
	      }
	    },
	    onBeforeUpload: function(id){
	      // about tho start uploading a file
	      ui_add_log('Starting the upload of #' + id);
	      ui_multi_update_file_progress(id, 0, '', true);
	      ui_multi_update_file_status(id, 'uploading', 'Uploading...');
	    },
	    onUploadProgress: function(id, percent){
	      // Updating file progress
	      ui_multi_update_file_progress(id, percent);
	    },
	    onUploadSuccess: function(id, data){
	      // A file was successfully uploaded
	      ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
	      ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
	      ui_multi_update_file_status(id, 'success', 'Upload Complete');
	      ui_multi_update_file_progress(id, 100, 'success', false);
	    },
	    onUploadError: function(id, xhr, status, message){
	      ui_multi_update_file_status(id, 'danger', message);
	      ui_multi_update_file_progress(id, 0, 'danger', false);  
	    },
	    onFallbackMode: function(){
	      // When the browser doesn't support this plugin :(
	      ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
	    },
	    onFileSizeError: function(file){
	      ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
	    },
	    onFileTypeError: function(file){
	      ui_add_log('File \'' + file.name + '\' cannot be added: must be an image (type error)', 'danger');
	    },
	    onFileExtError: function(file){
	      ui_add_log('File \'' + file.name + '\' cannot be added: must be an image (extension error)', 'danger');
	    }
	  });
	

	
	$('#btnApiStart').on('click', function(evt){
	    evt.preventDefault();	
	    $('#drag-and-drop-zone').dmUploader('start');

	    var formData = new FormData();
		for (var i = 0; i < arch.length; ++i) {
			formData.append('arhivosBackend[]', arch[i], arch[i].name);
		}
		
		$.ajax({
		  url: '/',
		  type: 'POST',
		  data: formData,
		  processData: false,
		  contentType: false,
		  success:  function (response) {
	        console.log("subido correctamente")
	      },
	      error: function (jqXHR, textStatus, errorThrown){
	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      }
		});
		
	  });
	
	  $('#btnApiReset').on('click', function(evt){
	    evt.preventDefault();	
	    $('#drag-and-drop-zone').dmUploader('reset');
	  });
	
	var archivo;
	
	$('#upload').click(function(){
		
		$.ajax({
		  url: '/',
		  type: 'POST',
		  data: archivo,
		  processData: false,
		  contentType: false,
		  success:  function (response) {
	        console.log("subido correctamente")
	      },
	      error: function (jqXHR, textStatus, errorThrown){
	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      }
		});
	})
	
	
	$("#files").change(function(){
		var nBytes = 0,
        	oFiles = document.getElementById("files").files,
        	nFiles = oFiles.length;
		console.log("oFiles = document.getElementById('files').files")
		console.log(oFiles)
		
		console.log("nFiles = oFiles.length;")
		console.log(nFiles)
		for (var nFileId = 0; nFileId < nFiles; nFileId++) {
		    nBytes += oFiles[nFileId].size;
		}
		
		console.log("nBytes " + nBytes)
		var sOutput = nBytes + " bytes";
			    
		
		console.log("formData")		
		
		var formData = new FormData();
		for (var i = 0; i < nFiles; ++i) {
			var file = oFiles[i];
//	        // Check the file type.
//	        if (!file.type.match('image.*')) {
//	            continue;
//	        }
			formData.append('arhivosBackend[]', file, file.name);
		}
		
		console.log(formData)
		archivo = formData
		
		console.log("sOutput " + sOutput)
		// optional code for multiples approximation
		for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
		    sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
		}
		// end of optional code
		
		document.getElementById("fileNum").innerHTML = nFiles;
		document.getElementById("fileSize").innerHTML = sOutput;
	})

} );



//IGNORAR ESTO


//
//
//$(document).on("click", "#upload", function() {
//    var outputdata = [];
//    var fileSelect = document.getElementById('files');
//    console.log(fileSelect)
//    var files = fileSelect.files;
//    console.log(files)
//    var formData = new FormData();
//    
//    // Loop through each of the selected files.
//    for (var i = 0; i < files.length; i++) {
//        var file = files[i];
//        // Check the file type.
//        if (!file.type.match('image.*')) {
//            continue;
//        }
//        // Add the file to the request.
//        formData.append('photos[]', file, file.name);
//    }
//    console.log(formData)
//    $.ajax({  
//        url: "/",  
//        type: "POST",  
//        data: formData,  
//        contentType: false,  
//        processData:false,  
//        success: function(files,data,xhr)  
//        {           
//           outputdata.push(files);
//           $('#hiddenval').val(outputdata);
//        },
//        error: function (jqXHR, textStatus, errorThrown){
//        	console.log(jqXHR);
//        	console.log(textStatus);
//        	console.log(errorThrown);
//          }
//    }); 
//});