<template>
        <div class="video-partial">
            <no-ssr  placeholder="Loading...">
                <iframe width="100%" height="350" :src="`https://www.youtube.com/embed/${video.Url}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </no-ssr>
            <div class="desc">
                <h3>محتوي الحلقة</h3>
                <p>{{video.Breif}}</p>
            </div>
        </div>
</template>
<script>
export default {
    props:['video'],
    data(){
        return {
            ready:false,
            dialog:false,
            videoId:"",
        }
    },
}
</script>
<style  src="@/assets/scss/partials/video.css" />

