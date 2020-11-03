//Global Variables

var imageOriginal = new MarvinImage();
var image; 


class Graph {
	constructor() {
	    this.nodes = [];
	    this.adjacencyList = {};
	}
		addNode(node) {
	    this.nodes.push(node);
				this.adjacencyList[node] = {};
	}
	addEdge(node1, node2, weight) {
 	    this.adjacencyList[node1].push({node:node2, weight: weight});
	    this.adjacencyList[node2].push({node:node1, weight: weight});
	}
}

let map = new Graph();



function load_image() {
    var c = document.getElementById("myCanvas");
		imageOriginal.load("bee.jpg", function() {
				Marvin.scale(imageOriginal.clone(), imageOriginal, 300, 450);
				imageOriginal.draw(c, 0, 0);
				create_graph(imageOriginal);
		});
		
}

function generate_distance(pixel_data, pixel_data1) {
		var red_diff = pixel_data[0] - pixel_data1[0];
		var green_diff = pixel_data[1] - pixel_data1[1];
		var blue_diff = pixel_data[1] - pixel_data1[1];

		
		var distance = Math.sqrt(Math.pow(red_diff, 2) + Math.pow(green_diff, 2) + Math.pow(blue_diff, 2));
		return distance;
}

function generate_edge(distance, neighbours_data)
{
		var sum = 0;
		for(var i = 0; i < neighbours_data.length; i++) {
				sum = sum + neighbours_data[i];
		}

		return (distance) / (sum + 0.0000001) 
		
}


function create_graph(imageOriginal) {

		
		for(var y = 1; y < imageOriginal.getHeight() - 1; y++) {
				for(var x = 1; x < imageOriginal.getWidth() - 1; x++) {
						var red = imageOriginal.getIntComponent0(x,y);
						var green = imageOriginal.getIntComponent1(x,y);
						var blue  = imageOriginal.getIntComponent2(x,y);


						pixel_coord = [x,y];
						pixel_coord_1 = [x-1, y-1];
						pixel_coord_2 = [x-1, y];
						pixel_coord_3 = [x-1, y+1];
						pixel_coord_4 = [x, y - 1];
						pixel_coord_5 = [x, y + 1];
						pixel_coord_6 = [x + 1, y - 1];
						pixel_coord_7 = [x + 1, y];
						pixel_coord_8 = [x + 1, y + 1];

						pixel_data = [red, green, blue];
 
						var neighbours = [pixel_coord_1, pixel_coord_2, pixel_coord_3, pixel_coord_4, pixel_coord_5, pixel_coord_6 ,pixel_coord_7, pixel_coord_8];
						var neighbours_data = [];
						var neighbours_distance = [];

						map.addNode(pixel_coord);
						
						

						for(var i = 0; i < neighbours.length; i++) {
								neighbours_data[i] = [imageOriginal.getIntComponent0(neighbours[i][0], neighbours[i][1]), imageOriginal.getIntComponent1(neighbours[i][0], neighbours[i][1]), imageOriginal.getIntComponent2(neighbours[i][0], neighbours[i][1])];
						}

						for (var i = 0; i < neighbours.length; i++) {
								neighbours_distance[i] = generate_distance(pixel_data, neighbours_data[i]);
						}

						for (var i = 0; i < neighbours_data.length; i++) {
								var edge = generate_edge(neighbours_distance[i], neighbours_distance);
								map.addNode(neighbours[i]);
								map.addEdge(pixel_coord, neighbours[i], 7);
								
						}
				}
		}

}


