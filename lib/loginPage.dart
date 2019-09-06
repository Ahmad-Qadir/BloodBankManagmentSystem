import 'package:blood_bank/service_layer.dart';
import 'package:flutter/material.dart';
import 'HomePage.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  var usernameController = TextEditingController();
  var passwordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Column(
        children: <Widget>[
          ClipPath(
            clipper: GetClipPath(),
            child: Container(
              height: 400.0,
              width: MediaQuery.of(context).size.width,
              color: Colors.red,
              child:
                  Image.asset("assets/Logo_File.png", color: Colors.white,width: 300,),
              //     SizedBox.fromSize(
              //   child: SvgPicture.asset(
              //     'assets/blood.svg',
              //   ),
              //   size: Size(100.0, 200.0),
              // ),
            ),
          ),
          Container(
            padding: EdgeInsets.all(20),
            child: Column(
              children: <Widget>[
                TextField(
                  controller: usernameController,
                  decoration: InputDecoration(labelText: "Username"),
                ),
                SizedBox(
                  height: 20,
                ),
                TextField(
                  controller: passwordController,
                  decoration: InputDecoration(labelText: "Password"),
                ),
                SizedBox(
                  height: 20,
                ),
                Center(
                  child: InkWell(
                    child: Container(
                      width: 100,
                      height: 50,
                      decoration: BoxDecoration(
                          gradient: LinearGradient(
                              colors: [Color(0xFF17ead9), Color(0xFF6078ea)]),
                          borderRadius: BorderRadius.circular(6.0),
                          boxShadow: [
                            BoxShadow(
                                color: Color(0xFF6078ea).withOpacity(.3),
                                offset: Offset(0.0, 8.0),
                                blurRadius: 8.0)
                          ]),
                      child: Material(
                        color: Colors.transparent,
                        child: InkWell(
                          highlightColor: Colors.redAccent,
                          onTap: () {
                            ApiService.login(usernameController.text,
                                passwordController.text);
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => Recipient()),
                            );
                          },
                          child: Center(
                            child: Text("SIGNIN",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontFamily: "Poppins-Bold",
                                    fontSize: 18,
                                    letterSpacing: 1.0)),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    ));
  }
}

class GetClipPath extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    Path path = Path();
    path.lineTo(0, size.height - 100);
    path.quadraticBezierTo(
        size.width / 2, size.height, size.width, size.height - 100);
    path.lineTo(size.width, 0);
    path.close();

    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) {
    return false;
  }
}
