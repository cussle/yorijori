// Oepn Source #3. Drop-down nav / License: (src/opensource_3.css) 1 lines
$(document).ready(function() {
    $(document).on('mouseover', 'li', function() {
        var $this = $(this);
        $this.find('.drop-down').stop(true, true).slideDown(300);
        $this.find(".nav-accent").addClass("nav-animate");
        $this.find(".nav-item").css("color", "#FFF");
    }).on('mouseleave', 'li', function() {
        var $this = $(this);
        $this.find(".drop-down").stop(true, true).slideUp(300);
        $this.find(".nav-accent").removeClass("nav-animate");
        $this.find(".nav-item").css("color", "#000");
    });
});
