#0 read input
data_profiles = read.csv("Desktop/profiles.csv", sep = ',')

# create 60 files of 1000 entries
startIndex <- 0
batchSize <- 59946
for (i in 1:1) { 
  # Retrieve subset of the data
  subset <- data_profiles[startIndex:(startIndex + batchSize), ]
  
  # Only use these specific columns
  selectedColumns <- subset[, c(1,3,4,6,17,18,19,20,24,25,26,27,29,31)]
  
  # merge 7-16 essays without separator
  selectedColumns[, 15] <- paste(subset$essay0,
                                 subset$essay1,
                                 subset$essay2,
                                 subset$essay3,
                                 subset$essay4,
                                 subset$essay5,
                                 subset$essay6,
                                 subset$essay7,
                                 subset$essay8,
                                 subset$essay9)
  
  # Overwrite column name to description
  colnames(selectedColumns)[colnames(selectedColumns)=="V15"] <- "description"
  
  # Create filename
  filename <- paste("Desktop/profiles_batch_",toString(i),".csv")
  
  # Write to file
  write.csv2(selectedColumns, file = filename)
  
  # increase startIndex
  startIndex <- i + batchSize
}