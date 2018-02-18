console.log(reverseString('string'));

var string = 'string';

var stringArray = ['s', 't', 'r', 'i', 'n', 'g']
static String reverse(String str) {
    if (str.length() == 0)
        return "";
    return str.charAt(str.length() - 1) + reverse(str.substring(0, str.length() - 1));
}