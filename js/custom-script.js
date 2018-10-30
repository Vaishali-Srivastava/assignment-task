$(document).ready(function(){
	ellipsisInit();
	myPageInit();
	
	myContentInit();
});

function ellipsisInit(){
    $(".ellipsis").dotdotdot({
		height: '100%',
		fallbackToLetter: true,
		watch: true,
	});
}

function myPageInit(){
	$(document).on('click', '[data-bind="enable-pages"]', function(){
		$(this).addClass('active');
		$('.main-wrapper').find('.grid').addClass('visible-wrap');
		$('.main-wrapper').find('.editable-wrap').removeClass('show-content hide-content');
		showGridAfterPageInit();
		hideGridAfterPageInit();
	});
}

function showGridAfterPageInit(){
	$(document).on('click', '.main-wrapper .visible-wrap', function(){
		$(this).find('.editable-wrap').addClass('show-content');
	});

}

function hideGridAfterPageInit(){
	$('body').on('click', '.main-wrapper .visible-wrap [data-close="close-editable"]', function(){
		console.log('hide the list');
		$(this).closest('.editable-wrap').removeClass('show-content').addClass('hide-content');
	});

}

function myContentInit(){
	$(document).on('click', '[data-edit="content-true"]', function(){
		$(this).addClass('active');
		$('.main-wrapper').find('.grid').addClass('edit-panel');
		editableContentInit();
		
	});
}

function editableContentInit(){
	$(document).on('click', '.main-wrapper .edit-panel', function(){
		$(this).find('.editable-wrap').addClass('edit-visible').attr('contenteditable', true);
	});
}

