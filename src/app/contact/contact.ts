import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})

export class ContactsComponent implements OnInit {
  contacts: any[] = [];

    ngOnInit(): void {
      this.listContacts();
    }

    listContacts() {
      try {
        client.models.Contact.observeQuery().subscribe({
          next: ({ items, isSynced}) => {
            this.contacts = items;
          },
        });
      } catch (error) {
        console.error('Error fetching contacts', error);
      }
    }

    createContact() {
      try {
        let contact: any = {
          firstName: 'Test',
          lastName: 'McPhearson',
          emaiAddress: '',
          phoneNumber: '',
          favoriteColor: ''
        }
        client.models.Contact.create(
          contact
        );
      } catch (error) {
        console.error('Error creating a new contact', error);
      }
    }
}
