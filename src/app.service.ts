import { Injectable } from '@nestjs/common';

const userData = {
  "V_4l4l76sxb_2UV10adUc31_xLuvkVoQIr3V03LVpcQ" : [
      "This data belongs to Admin"
  ],
  "iNY91AjXnOKYrq23ffwIb6KoYE5KMmLvv3_VzalBK6M": [
      "This data belongs to Dennis Internal"
  ]
}


let applicationData = "Hello World";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUserData(userId) {
    return userData[userId] || [];
  }

  getApplicationData() {
    return applicationData;
  }

  updateApplicationData() {
    return applicationData += ", Hello World";
  }
}
