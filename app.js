// Budget Controller
var budgetcontroller=(function(){
	var Expense=function(id,description,value){//Function Constructor
		this.id=id;
		this.description=description;
		this.value=value;
	};

	var Income=function(id,description,value){ //Function Constructor
		this.id=id;
		this.description=description;
		this.value=value;
	};

	var data= {
		allItems :{
			exp:[],
			inc:[]
		},
		totals:{
			exp:0,
			inc:0
		}
	};

	return {
		addItem: function(type,des,val){
			var newItem,ID;
			if(data.allItems[type].length>0){
				ID=data.allItems[type][data.allItems[type].length-1].id+1;//create new id

			} else{
				ID=0;
			}
			
			if(type==='exp'){
			 newItem = new Expense(ID,des,val); //creating object using fun constructor based on 'inc' or 'exp'
			} else if(type==='inc'){
				newItem= new Income(ID,des,val);
			}
			data.allItems[type].push(newItem);  //pushing inc or exp in the respective array
			return newItem;//return new element

		},

		

	};




	}
	)();


//UI Controller
var UIController=( function(){
	var DOMstrings={
		inputType: '.add__type',
		inputDescription:'.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'

	};

	return {//returns object
		getInput: function(){//object
			return {
				type: document.querySelector(DOMstrings.inputType).value,//properties of object
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},
		
		addListItem: function(obj,type){
			var html,newhtml,element;

			//create html string with placeholder text
			if(type==='inc')
			{
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

			}
			else if(type==='exp')
			{
				element = DOMstrings.expensesContainer;
				html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

			}
	
		   //Replace the placeholder text with actual data
		   newhtml=html.replace('%id%',obj.id);
		   newhtml=newhtml.replace('%description%',obj.description);
		   newhtml=newhtml.replace('%value%',obj.value);


			//insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);



		},
		clearFields: function(){
			var fields,fieldsArr;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue); //It is a list
			fieldsArr= Array.prototype.slice.call(fields);//converting list into array
			fieldsArr.forEach(function(current,index,array)
			{
				current.value="";
			});
			fieldsArr[0].focus(); //bringing back focus to description
			

		},
		getDOMstrings: function(){     // returning one more Object
			return DOMstrings;
		}

	};




})();

//Global App Controller
var controller=(function(budgetCtrl,UICtrl){
	var setupEventListeners= function(){  //Putting all event listener in one place
	var DOM=UICtrl.getDOMstrings();        
	document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);//Button clicked
	document.addEventListener('keypress',function(event){ //Enter pressed
		if(event.keyCode===13||event.which===13){
			ctrlAddItem();
		}
	});


	};



	
	var ctrlAddItem=function(){  //Adding new item
		var input,newItem;
		 input=UICtrl.getInput();//get the input
		newItem=budgetCtrl.addItem(input.type,input.description,input.value);//add the item from budget controller
		UICtrl.addListItem(newItem,input.type);      //add item to UI
		UICtrl.clearFields();  //clearing fields

	}

	return {
		init: function(){
			console.log('App has started');
			setupEventListeners();
		}
	};

	



 

})(budgetcontroller,UIController);
controller.init();
