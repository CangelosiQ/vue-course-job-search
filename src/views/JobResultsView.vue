<template>
  <div class="flex flex-row flex-nowrap w-full">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>

<script>
import JobFiltersSidebar from "@/components/jobResults/jobFiltersSidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/jobResults/JobListings.vue";
export default {
  name: "JobResultsView",
  components: { JobFiltersSidebar, JobListings },
};
</script>
