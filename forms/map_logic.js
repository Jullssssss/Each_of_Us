function fromWindows1252(binaryString) {
    var text = '';
    for (var i = 0; i < binaryString.length; i++) {
        text += WINDOWS_1252.charAt(binaryString.charCodeAt(i));
    }
    return text;
}

async function fetchData() {
  const response = await fetch('http://127.0.0.1:5000/marks');
  const myJson = await response.json(); //extract JSON from the http response
  return myJson;
}

var resp;

fetchData().then(res => {
    resp = res;
});

var myMap;

ymaps.ready(function () {
        myMap = new ymaps.Map('map', {
            center: [51.4019, 39.1103],
            zoom: 9
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        }),

        myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Новая метка',
                contentBody:'<p><label for="uname">Опишите проблему: </label>' +  // нужно реализовать добавление полученных данных в бд
                    '<input type="text" id="uname" name="name" />' + '</p>' +  // и это непросто видимо ибо js
                    '<input type="button" value="Опубликовать" />' + '</p>',
                contentFooter:'<sup>Щелкните еще раз</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });

        myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });

        var cur_time = new Date()

        const options1 = { day: 'numeric' };
        const options2 = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

        for (let i = 0; i < Object.keys(resp).length; i++) {

            date_diff = new Date(cur_time.getTime() - resp[i]['created_date'])

            var dt1 = new Intl.DateTimeFormat('en-GB', options1)
            var dt2 = new Intl.DateTimeFormat('en-GB', options2)


            if (resp[i]['is_completed'] == 'False') {
            myMap.geoObjects
                .add(new ymaps.Placemark([Number(resp[i]['x_coord']), Number(resp[i]['y_coord'])], {  // менять статус is_completed на True в бд
                balloonContent: "<strong>" + resp[i]['title'] + "</strong> </p>" + "Cоздано: " + dt1.format(date_diff) +
                 " дн. " + dt2.format(date_diff) + " назад" + '</p>' + '<input type="button" value="Откликнуться" />'  + '</p>'
        }, {
                preset: 'islands#glyphIcon',
                iconColor: '#FF0000',
                iconGlyph: 'heart-empty',
                iconGlyphColor: 'red'
            }))
        }
    }

});

// myPlacemark = new ymaps.Placemark([Number(resp['x_coord']), Number(resp['y_coord'])], {