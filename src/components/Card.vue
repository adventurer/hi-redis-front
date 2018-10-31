<template>
	
		<div class="col-2">
				<div class="card">
						<div class="card-body currency_state">
								<div class="content">
										<div class="text">{{title}} </div>
										<h5 class="number"><span id="cpu_sys">{{msg}}</span></h5>
								</div>
						</div>
				</div>

		</div>

		
		

</template>


<script>
export default {
	name: 'Card',
	props: {
		title: String,
		msg: String
	},
	created:function () {

	}
}
</script>

