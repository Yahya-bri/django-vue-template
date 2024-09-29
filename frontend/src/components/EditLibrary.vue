<template>
  <div>
    <h1>Edit Library</h1>
    <form @submit.prevent="updateLibrary">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="library.name" id="name" required />
      </div>
      <div>
        <label for="address">Address:</label>
        <textarea v-model="library.address" id="address" required></textarea>
      </div>
      <div>
        <label for="established_date">Established Date:</label>
        <input type="date" v-model="library.established_date" id="established_date" required />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      library: {
        name: '',
        address: '',
        established_date: ''
      }
    };
  },
  created() {
    this.fetchLibrary();
  },
  methods: {
    fetchLibrary() {
      // Replace with the actual ID of the library you want to edit
      const libraryId = 1;
      axios.get(`http://localhost:8000/library_service/libraries/${libraryId}/`)
        .then(response => {
          this.library = response.data;
        })
        .catch(error => {
          console.error('Error fetching library:', error);
        });
    },
    updateLibrary() {
      // Replace with the actual ID of the library you want to edit
      const libraryId = 1;
      axios.put(`http://localhost:8000/library_service/libraries/${libraryId}/`, this.library)
        .then(response => {
          alert('Library updated successfully!');
        })
        .catch(error => {
          console.error('Error updating library:', error);
        });
    }
  }
};
</script>