package com.bookstore;

import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.sql.SparkSession;
import scala.Tuple2;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

public class Counter {
    public static void main(String[] args) throws Exception {
        SparkSession spark = SparkSession.builder()
                .appName("Counter")
                .getOrCreate();

        JavaSparkContext jsc = new JavaSparkContext(spark.sparkContext());

        String inputDir = "F:/online-book-store/description/";
        String outputPath = inputDir + "Output.txt";
        String[] categories = {"CS.txt", "Fiction.txt", "Cartoon.txt", "Suspense.txt", "Music.txt", "Classic.txt", "Poetry.txt"};
        List<String> keywords = Arrays.asList(
                "algorithm", "machine learning", "compiler", "networking", "data structure",
                "AI", "programming", "systems", "love", "mystery", "adventure", "tragedy",
                "friendship", "fantasy", "hero", "conflict", "superpower", "villain",
                "detective", "magic", "humor", "murder", "crime", "thriller", "disappearance",
                "secrets", "psychological", "melody", "composition", "performance", "creativity",
                "psychology", "rhythm", "emotion", "romance", "society", "historical", "betrayal",
                "beauty", "life", "freedom"
        );

        JavaRDD<String> allDescriptions = jsc.emptyRDD();
        for (String category : categories) {
            String filePath = inputDir + category;
            allDescriptions = allDescriptions.union(jsc.textFile(filePath));
        }

        JavaPairRDD<String, Integer> totalKeywordCounts = allDescriptions
                // 去除标点符号
                .flatMap(line -> Arrays.asList(line.replaceAll("[^a-zA-Z0-9 ]", "").split(" ")).iterator())
                // 保留大写关键词匹配
                .filter(word -> keywords.contains(word))
                .mapToPair((PairFunction<String, String, Integer>) word -> new Tuple2<>(word, 1))
                .reduceByKey(Integer::sum);

        JavaPairRDD<String, Integer> sortedKeywordCounts = totalKeywordCounts.sortByKey();

        try (PrintWriter writer = new PrintWriter(new BufferedWriter(new FileWriter(outputPath, false)))) {
            writer.println("Total Keyword Counts Across All Files:");
            writer.println("=====================================");
            sortedKeywordCounts.collect().forEach(tuple -> writer.println(tuple._1 + ": " + tuple._2));
            System.out.println("Total keyword counts successfully written to " + outputPath);
        } catch (Exception e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }

        jsc.stop();
    }
}