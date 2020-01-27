readline = require('readline-sync'); // This allows me to ask user questions
//Function which handles invalid input
function invalid(a) {
  //While a is not equal to Y and N, it will keep notifying user that their input is invalid and will ask them again
  while(a !== 'Y' && a !== 'N'){
    console.log('Invalid');
    a = readline.question('Y/N?');
  }
return a;
}

//Function which handles the refund
function minus(a, refund) {
  //Asks the user how much
  var refund = Number(readline.question('How many credits do you wish to refund? '));
  while(refund > a || refund == '' || a === +a && a == (a|0) && Number.isInteger(refund) == false) {
    //If user input is greater than refund
    console.log("Error, you don't have this amount of credit");
    var refund = Number(readline.question('How many credits do you wish to refund? '));
  }
  return a - refund;//This minus the credits left over from the refund amount entered
}
//Function which handles invalid input for adding credit
function invalidCredit(a) {
  while(a === +a && a == (a|0) && Number.isInteger(a) == false || a == '' || a <= 0) {
    console.log('Invalid input')
    var a = Number(readline.question('Add Credit: '));
  }
  return a;
}
//Let users know about the rules for the vending machine
console.log('------------------------------------------  Please have your keyboard in uppercase and remember to press the enter key after each action   ----------------------------------------------');
//Start of the vending machine
var credit = readline.question('Do You Wish To Add Credit (Y/N)? ');
//Checks to see input is valid
credit = invalid(credit);
//Is so this section will run
if(credit == 'Y') {
 //Ask the user how much they would like to add
 var add_credit = Number(readline.question('Enter Amount of Credit: '));
 //If user enters a minus number the add_credit would equal to that so therefore add_credit will now be equal to the new number the user has entered
 var add_credit = invalidCredit(add_credit);

  //Array which stores each items ID, Name, Price(S/M/L) & Qty
  var items = [{id: 'A1', name: 'Cola     ', s: 3, m:4, l:5, qty: 8},{id: 'A2', name: 'Fanta    ', s: 2, m:3, l:4, qty: 4}, {id: 'A3', name: 'Sprite   ', s:1, m:2, l:4, qty: 6},
               {id: 'B1', name: 'Milka    ', s: 5, m:7, l:9, qty: 3}, {id: 'B2', name: 'Oreo     ', s: 4, m:6, l:7, qty: 4}, {id: 'B3', name: 'Maltesers', s: 2, m:4, l:5, qty: 5},
               {id: 'C1', name: 'Pringles ', s: 2, m:3, l:4, qty: 2}, {id: 'C2', name: 'Walkers  ', s: 1, m:2, l:3, qty: 7}, {id: 'C3', name: 'Doritos  ', s: 5, m:7, l:8, qty: 1}];
    display();
    //This runs the function main which handles how the user purchases a product
    main();
}
//Function that displays the vending machine
function display() {
    console.log('+==================================================================================================================================================================================+');
    console.log('|                                                                         Vending Machine                                                                                          |');
    console.log('+==================================================================================================================================================================================+');
    console.log('|                      ID                                 NAME                                         PRICE(S/M/L)                                  QTY                           |' + '\n');
    //This loops through the items in the array and gets each items key value without show the key which makes it look more real
    for(i in items) {
      console.log('|                      ' + items[i].id + '                                 ' +  items[i].name           + '                                    '  + items[i].s + '    ' + items[i].m + '    ' + items[i].l + '                                    ' + items[i].qty + '                            |' + '\n' );
    }
    console.log('+==================================================================================================================================================================================+');
}

function main(){
  var count = 0;//Resets the counts in the sizing function
  //Ask the user for thier choice
  var id = readline.question('Enter Item ID: ');
  //Loops through the array allowing me to access different keys of an item
  for (var idx = 0; idx < items.length; idx++) {
    //If item matches an id in the array run
    if (id == items[idx].id) {
    //Ask user for qty
    var qty = Number(readline.question('How many do you wish to purchase: '));
    //While these things apply it will keep asking the user for new input as old one was incorrect
    while(Number.isInteger(qty) == false || qty == '' || qty <= 0 || qty > items[idx].qty) {
      //Check to see if input isInteger also if input equals a space or less is than 0 output an error
      if(Number.isInteger(qty) == false || qty == '' || qty <= 0) {
        console.log('Invalid');
      }
      //If qty entered is greater than the item's stock inform the user
      else if(qty > items[idx].qty) {
        console.log('Sorry there is only ' + items[idx].qty + ' in stock');
        var another_choice = readline.question('Would you like to pick another product (Y/N)? ');
        another_choice = invalid(another_choice);
        if(another_choice == 'Y') {
          main();
        }
      }
      //If item qty is not avaiable print 'out of stock' and call the main function to allow user to enter a new choice
      else {
        console.log('Out of Stock');
        main();
      }
      //Once the else if statment block has run ask the user for the qty again
      var qty = Number(readline.question('Please enter again: '));
     }
    //Function which ask user for what size of each item they are purchasing
    function sizing(a, c, b) {
      count++//The count increaments every loop of the function
      console.log('Credit: ' + (add_credit - c));//So the user can see how much credit they have after choosing each size
      if(a == 0) {//Once a equals to 0 return c and the function will stop
        return c;
      } else {
      //So the user can ask for what size he wants for each item as the count increaments
      var ask_size = readline.question('What size would you like for item ' + count + ' S/M/L? ');
      //If user input is equal to a Size b will now equal the price of that size
      if(ask_size == 'S') {
         var b = items[idx].s;
      } else if(ask_size == 'M') {
        var b = items[idx].m;
      } else if(ask_size == 'L') {
        var b = items[idx].l;
      } else {
        //If size does not equal any it will notify the user to try again.
        console.log('This is not a size, please try again');
        //b is set to 0 so therefore the total is not affected
        b = 0;
        //count-- is used as the next run the count++ will increament altough the user is on the same item
        return sizing(a + 0, c + b,count--);
      }
      //a will minus 1 every run of the function
      //c will add b every run of the function
      return sizing(a - 1, c + b);

      }
    }
    //Qty is equal to a so therefore if qty is 5 the function will ask what size 5 times and stop as a is minusing 1 each run
    /*0 is equal to c so thefore on the first run it will be 0 + item price, on the second run it will be item price + item price
    and so on. This which will add up the total of all the items prices*/
    var size = sizing(qty, 0);

    //If user credit is less than the total
    if(add_credit < size){
      //Function that allows user to add a credit once at a time
      function add(a, b) {
        //If credit is equal or greater than 0 return credit value
        if(a >= 0) {
          return a;
        } else {
          //Notify the user how many more credits he needs add able to purchase the item
          //a * -1 converts the number to positive
          console.log('You need ' + (a * -1) + ' more credits');
          var b = Number(readline.question('Add credit: '));
          var b = invalidCredit(b);
          //c is equal to b which is users input
          c = b + a;
          return (add(c));//Recursive which will keeping add on the tottal
          }
        }
        //This varaible finds out how much credits is needed to purchase the item
        var credits_needed = add_credit - size;
        //This variable calls the add function passing in the amount of credits needed
        var left_over = add(credits_needed);
        //This is just to notify the user how many credits they have left
        console.log('Credit: ' + left_over);
    }

    //If Users has correct amount of credits or over this block will run
    else {
      /*There are two left_over varaibles as below it checks to see if the user has any credits left over
      so instead of writing the same code for both outcomes it was better just to use the same varaible*/
      var left_over = add_credit - size;
      //As both left_over varaibles are different values so therefore had to put this log again
      console.log('Credit: ' + left_over);
        }
    //This shows the users what they have purchased
    console.log('***************************************************************          Thankyou For Your Purchase of ' + qty + ' ' + items[idx].name + '    **************************************************************');

    //If any credits are left over this section will run
    if(left_over > 0) {
        //Asks the user for a refund
        var yes_no = readline.question('Would you like to refund your credit (Y/N)? ');
        yes_no = invalid(yes_no);
        //If yes the minus function will run passing in the left_over varaible
        if(yes_no == 'Y') {
        console.log('Credit: ' + minus(left_over));
      } else {//If user says no
        //Take away the qty amount that the user has purcahsed from the array
        items[idx].qty = items[idx].qty - qty;
        display();
        main();//Run the vending machine again
      }
    }
  }//End of item == array[idx].id
}//End of for Loop
}//End of main
