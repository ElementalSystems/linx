function optionalFeedbackPosition(lev)
{
  var forms=
  {
    1: "https://docs.google.com/forms/d/e/1FAIpQLSexJvNC1Hl7bRb2OVQI0qDRhn1TsIOURckomwLR4rKdxo0J3g/viewform?embedded=true"
  }
  if (forms[lev]) {
    document.getElementById('formholder').classList.toggle('act',true);
    document.getElementById('formframe').src=forms[lev];
  }
}
