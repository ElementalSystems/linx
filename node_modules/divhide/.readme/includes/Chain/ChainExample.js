
var Chain = Divhide.Chain;


var Maths = new Chain(

    /// the chaining fns
    {
        sum: function(i,j){
            return i + j;
        },

        sub: function(i, j){
            return i - j;
        }
    },

    /// the evaluation fns
    {
        calculate: function(result, err){
            return result;
        }
    },

    /// the options
    {

        /// if true the return of a function is passed as an argument to the next one
        /// if false, the evaluation arguments are passed to every chain function (default)
        pipe: true

    });


var value = Maths.sum(5)
    .sub(3)
    .sum(10)
    .calculate(0);

expect(value)
    .toBe(12);
