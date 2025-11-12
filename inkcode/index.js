class Vector extends Array {
    add(other) {
        return new Vector(this[0] + other[0], this[1] + other[1]);
    }

    sub(other) {
        return new Vector(this[0] - other[0], this[1] - other[1]);
    }

    lensq() {
        return this[0] * this[0] + this[1] * this[1];
    }

    len() {
        return Math.sqrt(this.lensq());
    }

    dist(other) {
        let delta = this.sub(other);
        return delta.len();
    }
}


const blocks = document.querySelectorAll(".block");
let active = null, offsetX, offsetY;

blocks.forEach(b => {
    b.onmousedown = e => {
        active = b;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    };
});

function get_pos(elem) {
    return new Vector(parseInt(elem.style.left), parseInt(elem.style.top))
}

function set_pos(elem, x, y) {
    elem.style.left = x + 'px';
    elem.style.top = y + 'px';
}

document.onmousemove = e => {
    if (!active) return;
    set_pos(active, e.pageX - offsetX, e.pageY - offsetY);

    blocks.forEach(b => {
        //active_pos = get_pos(active);
        //b_pos = get_pos(b);
        active_rect = active.getBoundingClientRect();
        b_rect = b.getBoundingClientRect();
        active_pos = get_pos(active);

        right_snap = new Vector(
            b_rect.right,
            b_rect.top
            //b_rect.y + b_rect.height * 0.5,
        );

        left_snap = new Vector(
            b_rect.left - b_rect.width,
            b_rect.top
            //b_rect.y + b_rect.height * 0.5,
        );
        
        dist = active_pos.dist(right_snap);
        if (dist < 15.0) {
            set_pos(active, right_snap[0], right_snap[1]);
        }

        dist = active_pos.dist(left_snap);
        if (dist < 15.0) {
            set_pos(active, left_snap[0], left_snap[1]);
        }
    })
};

document.onmouseup = () => active = null;