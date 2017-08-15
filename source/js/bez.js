/*
  Returns the points on a cubic bezier curve
  from xs,ys to xe,ye with control point xc,yc
  as an array like so [ {x: , y: },...]
*/
function bez(len,xs,ys,xe,ye,xc,yc){
  var cv=[];
  for (var i=0;i<len;i+=1) {
    var t=i/(len-1);
    var ti=1-t;
    cv.push({
      x: ti*ti*xs+2*ti*t*xc+t*t*xe,
      y: ti*ti*ys+2*ti*t*yc+t*t*ye
    });
  }
  return cv;
}
