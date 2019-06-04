var sec = 0;
var s = 0;

function tick(){ //таймер
  sec++;
  if(sec <= 9){//секунды
    document.getElementById("sec").innerHTML = '0' + sec;
  }

  if(sec > 9){
    document.getElementById("sec").innerHTML = sec;
  }

  if(sec > 99){//минуты
    s++;
    document.getElementById("tens").innerHTML = '0' + s;
    sec = 0;
    document.getElementById("sec").innerHTML = '0' + 0;
  }
    if(s > 9){
    document.getElementById("tens").innerHTML = s;
  }
}

function ran(){ //генератор уникальных чисел
  var arr = []
  while(arr.length < 8){
    var randomnumber = Math.floor(Math.random()*8) + 1;
    if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
    }

  return arr;
}


window.onload = function(){ //ждем загрузку окна а потом выполняем код
  var button = document.getElementById('input_button_bg_change');

  for(var i = 0; i < 16; i++){
    document.getElementById('game').innerHTML+='<div class = "block" id = "'+"a"+i+'"></div>';//создаем квадраты
  }

  var click = 1;
  button.onclick = function(){
    click++;
    if(click%2 == 0){ //проверям на четность нажатия кнопки

      var square_id = [];
      var r1 = [];
      var r2 = [];
      r1 = ran(); //получаем индексы из генератора уникальных чисел
      r2 = ran();
      var rundom_index = r1.concat( r2 );
      var value_square = {};
      var color = ['blue','green','#4D4D4D','#FFFF00','#A020F0','#A52A2A','#FFA500','#FFC0CB'];
      var count_couple = 10;
      var time = setInterval(tick, 1000); //объявляем время


      for(var i = 0; i < rundom_index.length; i++)
        value_square['a'+String(i)] = rundom_index[i]-1;//рандомность индексов для цветов

      document.getElementById('game').onclick = function(event) { //отслеживаем нажатия

        if(isNaN(event.target.id))//записываем в массив только те id не содержащие цифры
          square_id.push(event.target.id);

          document.getElementById(event.target.id).style.backgroundColor = color[value_square[event.target.id]]; //закрашиваем квадрат при нажатии

          if(square_id.length%2 == 0)//проверка для двух пар
          {
            //проверяем по id равны ли первому и второму квадрату
            //проверяем id чтобы не было одинаковых (исключение двойного нажатия на квадрат)
            //проверяем на новый id который присваивается при нахождении пары

            if( (value_square[square_id[square_id.length-2]] == value_square[square_id[square_id.length-1]]) && (square_id[square_id.length-2] != square_id[square_id.length-1]) && (value_square[square_id[square_id.length-2]] != count_couple && value_square[square_id[square_id.length-1]] != count_couple) ){

              //присваиваем новое id к квадратам
              document.getElementById(square_id[square_id.length-2]).id = count_couple;
              document.getElementById(square_id[square_id.length-1]).id = count_couple;
              //окрашиваем пары
              document.getElementById(count_couple).style.backgroundColor = color[value_square[square_id[square_id.length-2]]];
              document.getElementById(count_couple).style.backgroundColor = color[value_square[square_id[square_id.length-1]]];
              count_couple++; //считаем пары

                if(count_couple == 18){ //когда найдены пары ко всем карточкам выводим выигрыш и затраченное время
                  alert('Вы выиграли!!! Время '+document.getElementById('tens').innerHTML+" : "+document.getElementById('sec').innerHTML);
                  setTimeout(function() {
                    clearInterval(time); //останавливаем время
                  });
                }
            } else {
                     setTimeout(() => { //показываем неправильную картинку на 150 мс, а потом снова убираем
                     document.getElementById(square_id[square_id.length-2]).style.backgroundColor = 'white'; //закрашиваем оба квадрата
                     document.getElementById(square_id[square_id.length-1]).style.backgroundColor = 'white';
                   }, 1 * 150); //указываем время
                }

              }
            }
        } else {
          window.location.reload();//перезагрузка страницы при повторном нажатии на кнопку
        }
      }
}
