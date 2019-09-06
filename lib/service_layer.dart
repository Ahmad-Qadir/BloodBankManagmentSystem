import 'dart:convert';
import 'package:http/http.dart' as http;

class Urls {
  static const BASE_API_DONOR_URL =
      "http://172.31.51.65:3000/donor"; //baxshar
  static const BASE_API_RECIPIENT_URL =
      "http://192.168.100.3:3000/recipient"; //wargr
  static const BASE_API_PATIENT_URL =
      "http://192.168.100.3:3000/patient"; //wargry mangana
}

class ApiService {
  static Future<dynamic> _get(String url) async {
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        return null;
      }
    } catch (ex) {
      return null;
    }
  }

  static Future<dynamic> _post(String url, var data) async {
    Map<String, String> header = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    };
    http.post(url, headers: header, body: data).then((response) {
      print("Response status: ${response.statusCode}");
      print("Response body: ${response.body}");
      return response.statusCode;
    }).catchError((ex) {
      print(ex);
    });
  }

  static Future<dynamic> _delete(String url) async {
    http.delete(url).then((response) {
      print("Response status: ${response.statusCode}");
      print("Response body: ${response.body}");
      return response.statusCode;
    }).catchError((ex) {
      print(ex);
    });
  }

  static Future<List<dynamic>> getDonorList() async {
    return await _get('${Urls.BASE_API_DONOR_URL}/shows');
  }

  static Future<dynamic> showsSpecificDonor(var postId) async {
    return await _get('${Urls.BASE_API_DONOR_URL}/shows/$postId');
  }

  static Future<dynamic> register(var username, var fullname) async {
    var data = json.encode({
      "password": "Gashbeen1997",
      'username': "$username",
      "phoneNumber": "0238402348",
      "location": "Erbil",
      "name": "$fullname",
      "bloodType": "O-",
      "IDNumber": "deidjoe2",
      "gender": "Female",
      "employer": "Ahmed",
      "age": "41"
    });
    return await _post("${Urls.BASE_API_DONOR_URL}/register", data);
  }

  static Future<dynamic> deleteUser(var id) async {
    return await _delete("${Urls.BASE_API_DONOR_URL}/deactive/$id");
  }

  static Future<dynamic> login(var username, var password) async {
    var data = json.encode({"username": "$username", "password": "$password"});
    return await _post("${Urls.BASE_API_DONOR_URL}/login", data);
  }
}
