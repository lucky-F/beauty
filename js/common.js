$(function() {
	var duration =3000;
	var playTime = 2000;
	slide(duration, playTime);
})

function slide(duration, playTime) {
	var $newLi = $("#container li").eq(0).clone();
	$("#list").append($newLi);
	var $oUl = $("#list");
	var $buttons = $("#buttons").children();
	var $oLis = $oUl.children();
	var buttons = $("#buttons").children();
	var $left=$("#prev");
	var $right=$("#next");
	var index = 0;
	var imgLength = $oLis.length - 1;

	$right.on("click",function(){
		index++;
		animate(index);
		if(index > imgLength) {
			index = 1;
			$oUl.css({
				"left": 0 + "px"
			})
		}
		animate(index);
	}) 
	
	$left.on("click",function(){
		index--;
		animate(index);
		if(index <0) {
			index = 2;
			$oUl.css({
				"left": -(imgLength)*$oLis.eq(0).width() + "px"
			})
		}
		animate(index);
	}) 
    clearTimer($left);
    clearTimer($right);
	clearTimer($oUl);
	clearTimer($buttons);

	var timer = setInterval(function() {
		$right.click();
	}, duration);

	function clearTimer($ele) {
		$ele.hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(function() {
				$right.click();
			}, duration);
		})
	}

	$buttons.each(function() {
		var _index = $(this).index();
		$(this).on("click", function() {
			if(_index > imgLength) {
				_index = 1;
			}
			animate(_index);
		})
	})

	function animate(index) {
		$oUl.stop().animate({
			"left": index * (-$oLis.eq(0).width()) + 'px'
		}, playTime);
		$buttons.removeClass("on");
		$buttons.eq(index >= imgLength ? 0 : index).addClass("on");
	}
}