//utility to store and display a 5 x 6 hex grid

//create a grid in the dom element el from the init string
function buildGrid(el,init)
{
  var grd=[];
  for (var i=0;i<30;i+=1) {
    var t=tile(init.charAt(i*2));
    el.appendChild(t);
    t.t_i=i;
    t.t_dir=Number(init.charAt(i*2+1));
    //t.setTransformFuture(i%10*.1);
    t.setTransform();
    grd.push(t)
  }
  return grd;
}

function ti_to_x(i)
{
  return (i%5)*h_k*2;
}

function ti_to_y(i)
{
  return Math.floor(i/5)*h_j*2-(i%5)*h_j;
}
