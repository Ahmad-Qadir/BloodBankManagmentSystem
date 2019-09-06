import 'package:flutter/material.dart';
import 'service_layer.dart';

class Recipient extends StatelessWidget {
  DateTime now = new DateTime.now();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Recipients List"),
        elevation: 10,
        backgroundColor: Colors.redAccent,
      ),
      body: FutureBuilder(
          future: ApiService.getDonorList(),
          builder: (context, snapcshot) {
            if (snapcshot.hasData) {
              return ListView.builder(
                  itemCount: snapcshot.data.length,
                  itemBuilder: (context, index) {
                    return Card(
                      margin: EdgeInsets.only(left: 20, right: 20, top: 20),
                      elevation: 4,
                      child: Row(
                        children: <Widget>[
                          Image.asset(
                              "assets/${snapcshot.data[index]['bloodType']}.png",
                              height: 70),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                snapcshot.data[index]['fullname'],
                                style: TextStyle(
                                    fontSize: 25,
                                    letterSpacing: .6,
                                    fontWeight: FontWeight.bold),
                              ),
                              Row(
                                children: <Widget>[
                                  Text(
                                    "G.Blood: " +
                                        snapcshot.data[index]['bloodType'],
                                    style: TextStyle(
                                      fontSize: 15,
                                    ),
                                  ),
                                  SizedBox(
                                    width: 15,
                                  ),
                                  Text(
                                    "Location: " +
                                        snapcshot.data[index]['location'],
                                    style: TextStyle(
                                      fontSize: 15,
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                children: <Widget>[
                                  Text(
                                    "Date: " +
                                        snapcshot.data[index]['updatedAt'],
                                    style: TextStyle(
                                      fontSize: 15,
                                    ),
                                  ),
                                ],
                              ),
                              Row(
                                children: <Widget>[
                                  FlatButton.icon(
                                    label: Text(
                                      "Accept",
                                      style: TextStyle(fontSize: 20),
                                    ),
                                    icon: Image.asset(
                                      "assets/accept.png",
                                      height: 30,
                                    ),
                                    onPressed: () {
                                      ApiService.deleteUser(
                                          snapcshot.data[index]['_id']);
                                    },
                                  ),
                                  SizedBox(
                                    width: 20,
                                  ),
                                  FlatButton.icon(
                                    label: Text(
                                      "Reject",
                                      style: TextStyle(fontSize: 20),
                                    ),
                                    icon: Image.asset("assets/reject.png",
                                        height: 30),
                                    onPressed: () {},
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    );
                  });
            }
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  CircularProgressIndicator(),
                  SizedBox(
                    height: 20,
                  ),
                  Text("Loading... Please Wait!"),
                ],
              ),
            );
          }),
    );
  }
}
