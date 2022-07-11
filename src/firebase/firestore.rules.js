rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /stripe_customers/{uid} {
      allow read, write: if request.auth.uid == uid;

      match /payment_methods/{id} {
        allow read,write: if request.auth.uid == uid;
      }
      match /payments/{id} {
        allow read, write: if request.auth.uid == uid;
      }

    }
  }
}