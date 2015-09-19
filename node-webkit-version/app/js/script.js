/* global $:false;*/

function Signature (id, bgcolor) {
    this.$elem = $('#' + id);
    this.canvas = this.$elem[0];
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = bgcolor;
}


Signature.prototype.getHeight = function () {
        return this.$elem.height();
    };

Signature.prototype.getWidth = function () {
        return this.$elem.width();
    };

Signature.prototype.isMousePressed = false;

Signature.prototype.setColor = function (color) {
    this.ctx.fillStyle = color;
};

Signature.prototype.clearCanvas = function () {
    this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
    this.ctx.beginPath();
};

Signature.prototype.calcPos = function(event) {
    var pos = {},
        offset = this.$elem.offset();
    pos.X = event.pageX - offset.left;
    pos.Y = event.pageY - offset.top;
    return  pos;
};

Signature.prototype.saveSignature = function () {
    window.location.href = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
};


window.onload = function (){
    console.log('Loaded..');

    showToolTip ();

    var signature = new Signature('signatureCanvas', '#37FF45'),
        $saveBtn = $('#saveBtn'),
        $clrBtn = $('#clrBtn'),
        $toolTip = $('.tool-tip'),
        isEnabled = true,
        timeOut;


    function showToolTip () {
        timeOut = setTimeout(function() {
            $toolTip.css('display', 'block');
        }, 2000);
    }

    $(document).bind('mousemove', function() {
        clearTimeout(timeOut);
        if (isEnabled) {
            showToolTip ();
        }
        $toolTip.css('display', 'none');

    });



    signature.$elem.bind('mousedown', mouseDown.bind(signature));
    signature.$elem.bind('mouseup', mouseUp.bind(signature));
    signature.$elem.bind('mousemove', mouseMove.bind(signature));

    $clrBtn.bind('click', signature.clearCanvas.bind(signature));
    $saveBtn.bind('click', signature.saveSignature.bind(signature));


    function mouseDown(event) {
        isEnabled = false;
        $toolTip.css('display', 'none');
        this.isMousePressed = true;
        this.ctx.moveTo(this.calcPos(event).X, this.calcPos(event).Y);
    }
    function mouseUp(event) {
        this.isMousePressed = false;
        this.ctx.moveTo(this.calcPos(event).X, this.calcPos(event).Y);
    }

    function mouseMove(event) {
        if (this.isMousePressed) {
            this.ctx.lineWidth = 1;
            this.ctx.shadowBlur = 1.5;
            this.ctx.shadowColor = 'rgb(0, 0, 0)';
            this.ctx.lineTo(this.calcPos(event).X, this.calcPos(event).Y);
            this.ctx.stroke();
        }
    }
};
