//Basic structures used to easily manipulate a hex grid
var h_r=.5;// hex 'radius'
var h_i=.25; //vertex x offset
var h_j=0.44301; //vertex y offset
var h_k=.375; //mid point x offset
var h_l=.2165; //mid point y offset

var h_vx=[h_i,h_r,h_i,-h_i,-h_r,-h_i]; //x co-orddinates of vertexs
var h_vy=[-h_j,0,h_j,h_j,0,-h_j];//y co-orddinates of vertexs

var h_mx=[0,h_k,h_k,0,-h_k,-h_k,.2,-.2]; //x co-orddinates of mid points and ends
var h_my=[-h_j,-h_l,h_l,h_j,h_l,-h_l,0,0];//y co-orddinates of mid points and ends

function h_ni(i) { return (i+6*600)%6;} //normalise an hex index number to the range 0-5
