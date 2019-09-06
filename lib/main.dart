import 'package:blood_bank/loginPage.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "BBMS",
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}