function maxMinAvg(arr) {
    var min = arr[0],
        max = arr[0],
        sum = 0
    for (var i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
        if (max < arr[i]) {

            max = arr[i]
        }
        sum += arr[i]
    }
    var avg = sum / arr.length
    return ("The minimum is" + min + " , the maximum is " + max + ", and the average is " + avg + ".")

}


/////
/////



function fizzbuzz(n) {
    if (typeof n != "number") {
        return ("Parameter must be a positive number")
    }
    var arr = [];
    for (var i = 1; i <= n; i++) {

        if (i % 3 == 0 && i % 5 == 0) {
            arr.push("FizzBuzz");
            arr.push(',');
        }
        if (i % 3 == 0 && i % 5 != 0) {
            arr.push("Fizz");
            arr.push(',');
        }
        if (i % 3 != 0 && i % 5 == 0) {
            arr.push("Buzz");
            arr.push(',');
        }

        arr.push(i);
        arr.push(',');
    }

    var x = arr[arr.length - 2];
    arr.pop();
    arr.pop();
    arr.push('and' + x + '.');
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += arr[i];
    }
    return str
}


function bracesValid(str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (count < 0) {
            return (false)
        }
        if (str[i] == "{" || str[i] == "[" || str[i] == "(") {
            count++
        }
        if (str[i] == "}" || str[i] == "]" || str[i] == ")") {
            count--
        }
    }
    console.log(count)
    if (count == 0) {
        return (true)
    }
    return (false)
}


function BubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }

    }
    return arr
}


function coinChange(n) {
    if (typeof n == 'object') {
        count = 0;
        if (n['dollars']) {
            count += Number(n['dollars']) * 100
        }
        if (n['quarters']) {
            count += Number(n['quarters']) * 25
        }
        if (n['dimes']) {
            count += Number(n['dimes']) * 10
        }
        if (n['nickels']) {
            count += Number(n['nickels']) * 5
        }
        if (n['pennies']) {
            count += Number(n['pennies']) * 1
        };
        n = count;

    }


    if (typeof n == 'number') {
        var newobj = {};
        if (n / 100 > 1) {
            x = Math.floor(n / 100)
            n = n % 100;
            newobj['dollars'] = x;
        }
        if (n / 25 > 1) {
            x = Math.floor(n / 25)
            n = n % 25;
            newobj['quarters'] = x;


        }
        if (n / 10 > 1) {
            x = Math.floor(n / 10)
            n = n % 10;
            newobj['dimes'] = x;

        }
        if (n / 5 > 1) {
            x = Math.floor(n / 5)
            n = n % 5;
            newobj['nickels'] = x;

        }
        if (n > 0) {
            newobj['pennies'] = n;
        }
        return newobj
    }

}

function userLanguages(users) {
    var str = ''
    for (var x = 0; x < users.length; x++) {

        languages = users[x].languages
        var lag = ''
        for (var i = 0; i < languages.length - 1; i++) {
            lag += languages[i]
            lag += ', '
        }
        lag += 'and' + languages[languages.length - 1] + '.'

        interests = users[x].interests
        var inte = ''
        for (y in interests) {

            for (var i = 0; i < interests[y].length; i++) {
                inte += interests[y][i]
                inte += ','
            }
        }
        inte.length = inte.length - 1;
        inte += "."

        str += users[x].fname + users[x].lname + ' knows ' + lag + "\n" + users[x].fname + ' is also interested in ' + inte

    }
    return str
}

function binarySearch(arr, n) {
    var l = 0,
        h = arr.length - 1;


    while (h >= l) {
        var m = Math.floor((h + l) / 2);
        if (arr[m] == n) {
            return m
        }
        if (arr[m] < n) {
            l = m + 1;
        }
        if (arr[m] > n) {
            h = m - 1
        }
    }
    return (-1)
}

function binarySearchrecuition(arr, n, l, h) {
    var m = Math.floor((l + h) / 2)
    if (l > h) {
        return -1
    }
    if (arr[m] == n) {
        return m
    }
    if (arr[m] > n) {
        h = m - 1
        return binarySearchrecuition(arr, n, l, h)
    }
    if (arr[m] < n) {
        l = m + 1
        return binarySearchrecuition(arr, n, l, h)
    }
}