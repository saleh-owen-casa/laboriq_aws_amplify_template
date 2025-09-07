import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emailAddress: string;
  phoneNumber?: string;
  homeAddress?: string;
  favoriteColor?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})

export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  showCreateForm = false;
  showContactDetail = false;
  selectedContact: Contact | null = null;
  message = '';
  messageType = '';

  // Form data
  newContact: Contact = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    emailAddress: '',
    phoneNumber: '',
    homeAddress: '',
    favoriteColor: ''
  };

  ngOnInit(): void {
    this.listContacts();
  }

  listContacts() {
    try {
      client.models.Contact.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          this.contacts = items as Contact[];
        },
        error: (error) => {
          console.error('Error fetching contacts', error);
          this.showMessage('Error fetching contacts', 'error');
        }
      });
    } catch (error) {
      console.error('Error fetching contacts', error);
      this.showMessage('Error fetching contacts', 'error');
    }
  }

  async createContact() {
    try {
      // Validate required fields
      if (!this.newContact.firstName || !this.newContact.lastName || 
          !this.newContact.dateOfBirth || !this.newContact.emailAddress) {
        this.showMessage('Please fill in all required fields', 'error');
        return;
      }

      const contactData = {
        firstName: this.newContact.firstName,
        lastName: this.newContact.lastName,
        dateOfBirth: this.newContact.dateOfBirth,
        emailAddress: this.newContact.emailAddress,
        phoneNumber: this.newContact.phoneNumber || null,
        homeAddress: this.newContact.homeAddress || null,
        favoriteColor: this.newContact.favoriteColor || null
      };

      await client.models.Contact.create(contactData);
      
      this.showMessage('Contact created successfully!', 'success');
      this.resetForm();
      this.showCreateForm = false;
    } catch (error) {
      console.error('Error creating contact', error);
      this.showMessage('Error creating contact', 'error');
    }
  }

  async getContactById(recordId: string) {
    try {
      const contact = await client.models.Contact.get({ id: recordId });
      if (contact.data) {
        this.selectedContact = contact.data as Contact;
        this.showContactDetail = true;
      } else {
        this.showMessage('Contact not found', 'error');
      }
    } catch (error) {
      console.error('Error fetching contact', error);
      this.showMessage('Error fetching contact', 'error');
    }
  }

  showCreateFormToggle() {
    this.showCreateForm = !this.showCreateForm;
    this.showContactDetail = false;
    this.resetForm();
  }

  closeContactDetail() {
    this.showContactDetail = false;
    this.selectedContact = null;
  }

  resetForm() {
    this.newContact = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      emailAddress: '',
      phoneNumber: '',
      homeAddress: '',
      favoriteColor: ''
    };
  }

  showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
