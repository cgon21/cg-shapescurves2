class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }

    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let black = [0, 0, 0, 255];

        let p0 = { x: 100, y: 200 };
        let p1 = { x: 200, y: 700 };
        let p2 = { x: 600, y: 550 };
        let p3 = { x: 700, y: 500 };
        this.drawBezierCurve(p0, p1, p2, p3, this.num_curve_sections, [180, 0, 180, 255], framebuffer);

        let p02 = { x: 50, y: 80 };
        let p12 = { x: 200, y: 300 };
        let p22 = { x: 600, y: 400 };
        let p32 = { x: 800, y: 100 };
        this.drawBezierCurve(p02, p12, p22, p32, this.num_curve_sections, [0, 180, 180, 255], framebuffer);

        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        this.drawLine(p0, p3, [0, 0, 0, 20], framebuffer);
        this.drawLine(p02, p32, [0, 0, 0, 20], framebuffer);

        if (this.show_points) {
            this.drawVertex(p0, black, framebuffer);
            this.drawVertex(p1, black, framebuffer);
            this.drawVertex(p2, black, framebuffer);
            this.drawVertex(p3, black, framebuffer);

            this.drawVertex(p02, black, framebuffer);
            this.drawVertex(p12, black, framebuffer);
            this.drawVertex(p22, black, framebuffer);
            this.drawVertex(p32, black, framebuffer);
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let center1 = { x: 300, y: 300 };
        let radius1 = 200;
        this.drawCircle(center1, radius1, this.num_curve_sections, [230, 230, 0, 255], framebuffer);

        let center2 = { x: 500, y: 300 };
        let radius2 = 80;
        this.drawCircle(center2, radius2, this.num_curve_sections, [0, 180, 180, 255], framebuffer);

    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let polygon1_vertices = [
            { x: 50, y: 100 },
            { x: 300, y: 80 },
            { x: 800, y: 300 },
            { x: 700, y: 500 },
            { x: 100, y: 400 }
        ];

        let polygon2_vertices = [
            { x: 450, y: 350 },
            { x: 500, y: 300 },
            { x: 550, y: 350 },
            { x: 550, y: 400 },
            { x: 500, y: 450 },
            { x: 450, y: 400 }
        ];

        this.drawConvexPolygon(polygon1_vertices, [230, 230, 0, 255], framebuffer);
        this.drawConvexPolygon(polygon2_vertices, [180, 0, 180, 255], framebuffer);


        // Following lines are example of drawing a single triangle
        // (this should be removed after you implement the polygon)
        // let point_a = { x: 80, y: 40 };
        // let point_b = { x: 320, y: 160 };
        // let point_c = { x: 240, y: 360 };
        // this.drawTriangle(point_a, point_c, point_b, [0, 128, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices

        let black = [0, 0, 0, 255];
        let white = [255, 255, 255, 255];

        // C
        let C_top = [
            { x: 30, y: 300 },
            { x: 30, y: 500 },
            { x: 230, y: 500 },
            { x: 230, y: 400 }
        ];
        this.drawBezierCurve(C_top[0], C_top[1], C_top[2], C_top[3], this.num_curve_sections, black, framebuffer);

        let C_bottom = [
            { x: 30, y: 300 },
            { x: 30, y: 100 },
            { x: 230, y: 100 },
            { x: 230, y: 200 }
        ];
        this.drawBezierCurve(C_bottom[0], C_bottom[1], C_bottom[2], C_bottom[3], this.num_curve_sections, black, framebuffer);

        // e
        let e_top = [
            { x: 240, y: 250 },
            { x: 240, y: 350 },
            { x: 340, y: 350 },
            { x: 340, y: 250 }
        ];
        let e_bottom = [
            { x: 240, y: 250 },
            { x: 240, y: 100 },
            { x: 340, y: 100 },
            { x: 340, y: 200 }
        ];

        this.drawBezierCurve(e_top[0], e_top[1], e_top[2], e_top[3], this.num_curve_sections, black, framebuffer);
        this.drawBezierCurve(e_bottom[0], e_bottom[1], e_bottom[2], e_bottom[3], this.num_curve_sections, black, framebuffer);
        this.drawLine(e_top[0], e_top[3], black, framebuffer);

        // s
        let S = [
            { x: 355, y: 170 },
            { x: 430, y: 120 },
            { x: 505, y: 170 },
            { x: 505, y: 300 },
            { x: 430, y: 350 },
            { x: 355, y: 300 }
        ];
        this.drawConvexPolygon(S, [255, 180, 255, 255], framebuffer);

        this.drawLine({ x: 430, y: 258 }, { x: 430, y: 304 }, white, framebuffer);
        this.drawLine({ x: 430, y: 166 }, { x: 430, y: 212 }, white, framebuffer);

        this.drawLine({ x: 430, y: 258 }, { x: 505, y: 212 }, white, framebuffer);
        this.drawLine({ x: 430, y: 212 }, { x: 355, y: 258 }, white, framebuffer);

        this.drawTriangle({ x: 505, y: 258 }, { x: 505, y: 212 }, { x: 467, y: 235 }, white, framebuffer);
        this.drawTriangle({ x: 355, y: 258 }, { x: 355, y: 212 }, { x: 393, y: 235 }, white, framebuffer);

        // a
        this.drawCircle({ x: 580, y: 250 }, 65, this.num_curve_sections, black, framebuffer);
        this.drawLine({ x: 645, y: 315 }, { x: 645, y: 185 }, black, framebuffer);

        // r
        this.drawLine({ x: 665, y: 315 }, { x: 665, y: 185 }, black, framebuffer);
        let r = [
            { x: 665, y: 250 },
            { x: 665, y: 350 },
            { x: 765, y: 350 },
            { x: 765, y: 300 }
        ];
        this.drawBezierCurve(r[0], r[1], r[2], r[3], this.num_curve_sections, black, framebuffer);
    }


    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let t_step = 1.0 / num_edges;
        let previousPoint = p0;

        for (let i = 1; i <= num_edges; i++) {
            let t = i * t_step;

            let x = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
            let y = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;

            let currentPoint = { x: Math.round(x), y: Math.round(y) };
            this.drawLine(previousPoint, currentPoint, color, framebuffer);

            previousPoint = currentPoint;
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        let angleStep = (2 * Math.PI) / num_edges;
        let currentAngle = 0;
        let previousPoint = {
            x: center.x + radius * Math.cos(0),
            y: center.y + radius * Math.sin(0)
        };

        for (let i = 1; i <= num_edges; i++) {
            currentAngle = i * angleStep;
            let x = center.x + radius * Math.cos(currentAngle);
            let y = center.y + radius * Math.sin(currentAngle);
            let currentPoint = { x: Math.round(x), y: Math.round(y) };
            this.drawLine(previousPoint, currentPoint, color, framebuffer);
            previousPoint = currentPoint;
        }
    }

    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon

        for (let i = 1; i < vertex_list.length - 1; i++) {
            let vertex0 = vertex_list[0];
            let vertex1 = vertex_list[i];
            let vertex2 = vertex_list[i + 1];

            this.drawTriangle(vertex0, vertex1, vertex2, color, framebuffer);
        }
    }

    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        v1 = { x: Math.round(v.x - 10), y: Math.round(v.y + 10) };
        v2 = { x: Math.round(v.x + 10), y: Math.round(v.y + 10) };
        v3 = { x: Math.round(v.x - 10), y: Math.round(v.y - 10) };
        v4 = { x: Math.round(v.x + 10), y: Math.round(v.y - 10) };

        this.drawLine(v1, v3, color, framebuffer);
        this.drawLine(v2, v4, color, framebuffer);
    }

    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
        return 4 * y * framebuffer.width + 4 * x;
    }

    setFramebufferColor(color, x, y, framebuffer) {
        let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }

    swapPoints(a, b) {
        let tmp = { x: a.x, y: a.y };
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;

        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;

        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }

    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = { x: p0.x, y: p0.y };
        p1 = { x: p1.x, y: p1.y };
        p2 = { x: p2.x, y: p2.y };
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);

        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            { x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y) }, // edge01
            { x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y) }, // edge02
            { x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y) }  // edge12
        ];

        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = { x: p1.x - p0.x, y: p1.y - p0.y };
        let v02 = { x: p2.x - p0.x, y: p2.y - p0.y };
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;

        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }

        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
